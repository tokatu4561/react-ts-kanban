import React, { useRef, useState } from "react";
import styled from "styled-components";
import * as color from "../color";
import { CheckIcon as _CheckIcon, TrashIcon } from "./Icon";

type Props = {
  children?: string;
  onDragStart: () => void;
  onDragEnd: () => void;
};

export function Card(props: Props) {
  const { children, onDragStart, onDragEnd } = props;

  const [drag, setDrag] = useState(false);
  return (
    <Container
      style={{ opacity: drag ? 0.5 : undefined }}
      onDragStart={() => {
        onDragStart?.();
        setDrag(true);
      }}
      onDragEnd={() => {
        onDragEnd();
        setDrag(false);
      }}
    >
      <_CheckIcon></_CheckIcon>
      <Text>{children}</Text>
      <DeleteButton />
    </Container>
  );
}

type DropProps = {
  disabled?: boolean;
  onDrop?(): void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function DropArea({
  disabled,
  onDrop,
  children,
  className,
  style,
}: DropProps) {
  const [isTarget, setIsTarget] = useState(false);
  const visible = !disabled && isTarget;

  const [dragOver, onDragOver] = useDragAutoLeave();

  return (
    <DropAreaContainer
      style={style}
      className={className}
      onDragOver={(ev) => {
        if (disabled) return;

        ev.preventDefault();
        onDragOver(() => setIsTarget(false));
      }}
      onDragEnter={() => {
        if (disabled || dragOver.current) return;

        setIsTarget(true);
      }}
      onDrop={() => {
        if (disabled) return;

        setIsTarget(false);
        onDrop?.();
      }}
    >
      <DropAreaIndicator
        style={{
          height: !visible ? 0 : undefined,
          borderWidth: !visible ? 0 : undefined,
        }}
      />

      {children}
    </DropAreaContainer>
  );
}

/**
 * dragOver イベントが継続中かどうかのフラグを ref として返す
 *
 * timeout 経過後に自動でフラグが false になる
 *
 * @param timeout 自動でフラグを false にするまでの時間 (ms)
 */
function useDragAutoLeave(timeout: number = 100) {
  const dragOver = useRef(false);
  const timer = useRef(0);

  const array = [
    dragOver,

    /**
     * @param onDragLeave フラグが false になるときに呼ぶコールバック
     */
    (onDragLeave?: () => void) => {
      clearTimeout(timer.current);

      dragOver.current = true;
      timer.current = window.setTimeout(() => {
        dragOver.current = false;
        onDragLeave?.();
      }, timeout);
    },
  ] as const;

  return array;
}

const Container = styled.div`
  position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  cursor: move;
`;

const Text = styled.span`
  color: ${color.Black};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`;

const DeleteButton = styled.button.attrs({
  type: "button",
  children: <TrashIcon />,
})`
  position: absolute;
  top: 12px;
  right: 8px;
  font-size: 14px;
  color: ${color.Gray};

  :hover {
    color: ${color.Red};
  }
`;

const DropAreaContainer = styled.div`
  > :not(:first-child) {
    margin-top: 8px;
  }
`;

const DropAreaIndicator = styled.div`
  height: 40px;
  border: dashed 3px ${color.Gray};
  border-radius: 6px;
  transition: all 50ms ease-out;
`;
