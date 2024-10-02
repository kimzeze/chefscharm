import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-10 w-full border-t border-primary bg-black text-xs text-white">
      <div className="mx-auto flex max-w-[480px] flex-col space-y-4 p-4">
        <div>
          <p className="font-semibold">Developers</p>
          <div className="flex flex-col space-y-2">
            <div>
              <p className="font-semibold">Kim</p>
              <p>Email. fridaynight@kakao.com</p>
            </div>
            <div>
              <p className="font-semibold">Hyeon</p>
              <p>Email. hyunzsu@kakao.com</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold">
            Developed by Kim & Hyeon. 2024 <br /> For entertainment purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
