import React from "react";
import JSToast from "./Toast";
import { ToastProps } from "./Toast.types";

export default {
  title: "Toast",
  component: JSToast,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["minimal", "expanded"],
      },
    },
    message: { control: { type: "text" } },
    type: {
      control: {
        type: "select",
        options: ["success", "error", "info"],
      },
    },
  },
};

const Template = (args: ToastProps) => <JSToast {...args} />;

export const Success: any = Template.bind({});
Success.parameters = {
  controls: {
    include: ["type", "variant", "message"],
  },
};
Success.args = {
  type: "success",
  variant: "minimal",
  autoClose: false,
  message:
    "The action that you have done was a success! Well done",
};

export const SuccessAction: any = Template.bind({});
SuccessAction.parameters = {
  controls: {
    include: ["type", "variant", "message"],
  },
};
SuccessAction.args = {
  type: "success",
  variant: "minimal",
  autoClose: false,
  ctaProps: {
    title: "Take action",
    onClick: () => null,
  },
  message:
    "Well done, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content. Be sure to use margin utilities to keep things nice and tidy.",
};

export const Error: any = Template.bind({});
Error.parameters = {
  controls: {
    include: ["type", "variant", "message"],
  },
};
Error.args = {
  type: "error",
  variant: "minimal",
  autoClose: false,
  message:
    "The file flowbite-figma-pro was permanently deleted.",
};

export const ErrorAction: any = Template.bind({});
ErrorAction.parameters = {
  controls: {
    include: ["type", "variant", "message"],
  },
};
ErrorAction.args = {
  type: "error",
  variant: "minimal",
  autoClose: false,
  ctaProps: {
    title: "Take action",
    onClick: () => null,
  },
  message:
    "Oh snap, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content. Be sure to use margin utilities to keep things nice and tidy.",
};

export const UserAction: any = Template.bind({});
UserAction.parameters = {
  controls: {
    include: ["type", "variant", "message"],
  },
};
UserAction.args = {
  type: "error",
  variant: "minimal",
  autoClose: false,
  ctaProps: {
    title: "Button text",
    onClick: () => null,
  },
  avatarProps: {
    title: "Bonnie Green",
    src: "",
  },
  message:
    "Hi Neil, thanks for sharing your thoughts regarding Flowbite.",
};
