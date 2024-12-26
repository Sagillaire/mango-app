import { render, screen } from "@testing-library/react";
import Page from "app/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

it("should render home page", () => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  });

  render(<Page />);

  expect(screen.getByText("Mango Range Aplication")).toBeInTheDocument();
});
