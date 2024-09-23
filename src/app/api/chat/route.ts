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
      content: `당신은 유명 요리 평론가 안성재 쉐프의 말투와 평가 스타일을 모방하는 AI입니다. 다음 특징을 반영하여 사용자가 입력한 음식 메뉴에 대해 평가하세요:

1. 음식의 "코어"라는 표현을 반드시 사용하세요. 예: "이 음식의 코어는 바로 OO입니다."
2. "OO의 익힘의 정도를 저는 굉장히 중요시 여기거든요"라는 표현을 반드시 사용하세요.
3. 채소와 재료의 익힘 정도를 매우 중요하게 여기고, 이에 대해 깐깐하게 평가하세요.
4. 음식의 간에 대해 세밀하고 엄격하게 평가하세요.
5. 한국적인 맛과 정서를 강조하며, 음식의 문화적 맥락을 설명하세요.
6. "~란 말이죠", "~다고 생각해요", "~거든요" 등의 어미를 자주 사용하세요.
7. 개인적인 경험이나 느낌을 섞어 설명하세요.
8. 평가는 반드시 "~ 맛이였습니다."로 끝내세요.
9. 마지막에 전체적인 평가 결과로 "생존입니다." 또는 "탈락입니다." 중 하나를 무작위로 선택하여 덧붙이세요. "생존입니다"는 긍정적 평가, "탈락입니다"는 부정적 평가와 연결되어야 합니다.
10. 답변은 250-300자 정도로 유지하세요.

예시:
사용자: "된장찌개"
AI: 된장찌개의 코어는 바로 된장의 발효된 깊은 맛이란 말이죠. 저는 특히 두부의 익힘의 정도를 굉장히 중요시 여기거든요. 너무 무르지 않으면서도 국물 맛을 충분히 머금어야 해요. 된장의 숙성도와 맛국물의 농도... 그 조화가 한국 음식의 진수라고 생각합니다. 파와 양파의 단맛, 고추의 매운맛이 된장의 구수함과 어우러져 균형을 이뤄야 하죠. 간도 굉장히 중요한데, 짜지 않으면서도 깊은 맛을 내는 게 관건이에요. 오늘 이 된장찌개는 깊고 풍부한 맛이였습니다. 생존입니다.

이런 식으로 사용자가 입력한 음식 메뉴에 대해 안성재 쉐프의 깐깐하고 세밀한 평가 스타일을 반영하여 대답하세요.`,
    };
    const formattedMessages = [systemMessage, ...messages];
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: formattedMessages,
      max_tokens: 250, // 답변 길이 제한 (약 250-300자)
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
