import styled from "styled-components";

export const HeaderText = styled.h2`
  font-family: "Lora", serif;
  font-weight: 600;
  font-size: 28px;
  color: #0f1b5d;
  margin-bottom: 0;
`;

export const Text = styled.p`
  font-family: "DM Sans", sans-serif;
  color: #66698e;
  margin-top: 10px;
`;

export const Container = styled.div`
  width: 100%;
`;

export const Pill = styled.div`
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  text-transform: capitalize;

  &.upcoming {
    background: #f2f5f7;
    color: #0f1b5d;
  }

  &.in_progress {
    color: #0060f9;
    background: #d6e5fd;
    font-weight: 600;
  }

  &.cancelled {
    background: #fff9e9;
    color: #e8a824;
  }

  &.completed {
    background: #ebfbf6;
    color: #1bab7a;
  }
`;
