import { AlertActionStyle } from "./types";

export const alertActionClassName = (type?: AlertActionStyle) => {
  switch (type) {
    case "default":
      return "btn";
    case "primary":
      return "btn btn-primary";
    case "ghost":
      return "btn btn-ghost";
    case "link":
      return "btn btn-link";
  }
};
