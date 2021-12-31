import React, { useEffect, useRef } from "react";
/**
 * テキストエリアの高さを内容に合わせて自動調整する
 *
 * @param content テキストエリアの内容
 */
export function useAutoFitToContentHeight(content: string | undefined) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(
    () => {
      const el = ref.current;
      if (!el) return;

      const { borderTopWidth, borderBottomWidth } = getComputedStyle(el);
      el.style.height = "auto"; // 一度 auto にしないと高さが縮まなくなる
      el.style.height = `calc(${borderTopWidth} + ${el.scrollHeight}px + ${borderBottomWidth})`;
    },
    // 内容が変わるたびに高さを再計算
    [content]
  );

  return ref;
}
