import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as color from "../color";
import { Button, ConfirmButton } from "./Button";
import { useAutoFitToContentHeight } from "../hooks/useAutoFitToContentHeight";

type Props = {
  value?: string;
  onChange?(value: string): void;
  onConfirm?(): void;
  onCancel?(): void;
  className?: string;
};

export function InputForm(props: Props) {
  const { value, onChange, onConfirm, onCancel, className } = props;
  //空文字だった場合は追加するボタンを表示しないため
  const disabled = !value?.trim();
  const handleConfirm = () => {
    if (disabled) return;
    onConfirm?.();
  };
  //入力を受け取り、新しい値をtectフォームに設定する
  const onChangeText = (event: any) => {
    onChange?.(event.currentTarget.value);
  };

  const ref = useAutoFitToContentHeight(value);

  return (
    <Container className={className}>
      <Input
        ref={ref}
        autoFocus
        placeholder="Todoを追加"
        value={value}
        onChange={onChangeText}
        onKeyDown={(ev) => {
          if (!(ev.key === "Enter")) return;
          handleConfirm();
        }}
      />

      <ButtonRow>
        <AddButton disabled={disabled} onClick={handleConfirm} />
        <CancelButton onClick={onCancel} />
      </ButtonRow>
    </Container>
  );
}

const Container = styled.div``;

const Input = styled.textarea`
  display: block;
  width: 80%;
  margin-bottom: 8px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
  padding: 6px 8px;
  background-color: ${color.White};
  font-size: 14px;
  line-height: 1.7;

  :focus {
    outline: none;
    border-color: ${color.Blue};
  }
`;

const ButtonRow = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: 8px;
  }
`;

const AddButton = styled(ConfirmButton).attrs({
  children: "Add",
})``;

const CancelButton = styled(Button).attrs({
  children: "Cancel",
})``;
