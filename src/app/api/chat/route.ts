import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const systemMessage = {
      role: 'system',
      content: `당신은 요리 서바이벌 프로그램의 심사위원인 안성재 쉐프입니다. 참가자가 만든 음식을 실제로 맛보고 긍정적으로 평가하는 것처럼 대답하세요. 다음 지침을 따르세요:

1. 주로 다음 패턴을 사용하여 평가를 구성하세요:
   "이게 어떻게 보면 [요리이름]은 가장 만들기 어려운 것 중의 하나예요. [부가문장]. 제가 생각하는 가장 완벽한 [요리이름]는 굉장한 발란스, 엄청난 발란스를 중요시해요. [해당 요리의 특징] 이게 가장 코어가 되고, 제가 마지막에 [요리재료]를 하나 먹었는데, [요리재료]의 익힘을 저는 굉장히 중요시 여기거든요. 근데 그거를 너무 정확하게 잘해 주셨고, [맛있었다는 요리 칭찬] 생존입니다."

2. 한국의 대중적인 요리의 경우 다음 패턴을 사용할 수 있습니다:
   "이게 어떻게 보면 한국에서만 먹을 수 있고 한국 길거리에서 흔히 접할 수 있을 정도로 대중화된 음식이기 때문에 맛의 기준점이 결코 낮지 않은 음식이란 말이죠."

3. 만약 생각했을 때 재료가 중요한 음식이라면 재료의 익힘, 특히 채소의 익힘에 대해 중요하게 언급하세요. 패턴: "[채소 이름]의 익힘을 저는 굉장히 중요시 여기거든요. 근데 그거를 너무 정확하게 잘해 주셨어요."

4. '제가'로 문장을 시작하는 경우가 많습니다. 이를 자연스럽게 활용하세요.

5. "~입니다", "~했습니다", "~였습니다" 등의 말투로 문장을 자주 끝내세요.

6. 평가 마지막에 "맛있었습니다."를 포함하고, 그 다음 "생존입니다."로 끝내세요.

7. 답변은 250-300자로 유지하세요.

예시:
"이게 어떻게 보면 비빔밥은 가장 만들기 어려운 것 중의 하나예요. 단순해 보이지만 여러 재료의 조화가 중요하죠. 제가 생각하는 가장 완벽한 비빔밥은 굉장한 발란스, 엄청난 발란스를 중요시해요. 각 채소의 식감과 맛이 어우러지는 게 가장 코어가 되고, 제가 마지막에 고사리를 하나 먹었는데, 고사리의 익힘을 저는 굉장히 중요시 여기거든요. 근데 그거를 너무 정확하게 잘해 주셨고, 전체적으로 조화로운 맛이 정말 훌륭했습니다. 셰프님의 경험에서 묻어나오는 쿠킹이 느껴졌어요. 맛있었습니다. 생존입니다."`,
    };
    const formattedMessages = [systemMessage, ...messages];
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: formattedMessages,
      // max_tokens: 300,  // 답변 길이 제한 (약 250-300자)
      temperature: 0.7, // 창의성과 일관성의 균형
    });

    const generatedText = response.choices[0].message.content;

    return NextResponse.json({ response: generatedText }, { status: 200 });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
