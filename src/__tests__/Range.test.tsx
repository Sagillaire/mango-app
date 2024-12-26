import { fireEvent, render, screen } from "@testing-library/react";
import { Range } from "../components";

describe("Range Component", () => {
  test("renders loading state", () => {
    render(<Range loading={true} />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders default values", () => {
    render(<Range />);
    expect(screen.getByText(/1 €/i)).toBeInTheDocument();
    expect(screen.getByText(/100 €/i)).toBeInTheDocument();
  });

  test("renders fixed mode values", () => {
    render(<Range mode="fixed" values={[10, 20, 30]} />);
    expect(screen.getByText(/10 €/i)).toBeInTheDocument();
    expect(screen.getByText(/30 €/i)).toBeInTheDocument();
  });

  test("updates min value through input", () => {
    render(<Range />);
    fireEvent.click(screen.getByText(/1 €/i));
    const input = screen.getByDisplayValue("1");
    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.blur(input);
    expect(screen.getByText(/5 €/i)).toBeInTheDocument();
  });

  test("updates max value through input", () => {
    render(<Range />);
    fireEvent.click(screen.getByText(/100 €/i));
    const input = screen.getByDisplayValue("100");
    fireEvent.change(input, { target: { value: "90" } });
    fireEvent.blur(input);
    expect(screen.getByText(/90 €/i)).toBeInTheDocument();
  });

  test("handles slider movement for min thumb", () => {
    render(<Range />);
    const minThumb = screen.getAllByRole("slider")[0];
    fireEvent.mouseDown(minThumb);
    fireEvent.mouseMove(minThumb, { clientX: 50 });
    fireEvent.mouseUp(minThumb);
    expect(parseInt(minThumb.style.left, 10)).toBeGreaterThanOrEqual(0);
  });

  test("handles slider movement for max thumb", () => {
    render(<Range />);
    const maxThumb = screen.getAllByRole("slider")[1];
    fireEvent.mouseDown(maxThumb);
    fireEvent.mouseMove(maxThumb, { clientX: 150 });
    fireEvent.mouseUp(maxThumb);
    expect(parseInt(maxThumb.style.left, 10)).toBeLessThanOrEqual(100);
  });

  test("prevents min thumb from crossing max thumb", () => {
    render(<Range />);
    const minThumb = screen.getAllByRole("slider")[0];
    const maxThumb = screen.getAllByRole("slider")[1];
    fireEvent.mouseDown(minThumb);
    fireEvent.mouseMove(minThumb, {
      clientX: parseInt(maxThumb.style.left, 10),
    });
    fireEvent.mouseUp(minThumb);
    expect(parseInt(minThumb.style.left, 10)).toBeLessThan(
      parseInt(maxThumb.style.left, 10)
    );
  });

  test("prevents max thumb from crossing min thumb", () => {
    render(<Range />);
    const minThumb = screen.getAllByRole("slider")[0];
    const maxThumb = screen.getAllByRole("slider")[1];
    fireEvent.mouseDown(maxThumb);
    fireEvent.mouseMove(maxThumb, {
      clientX: parseInt(minThumb.style.left, 10),
    });
    fireEvent.mouseUp(maxThumb);
    expect(parseInt(maxThumb.style.left, 10)).toBeGreaterThan(
      parseInt(minThumb.style.left, 10)
    );
  });

  test("renders slider range correctly", () => {
    render(<Range />);
    const sliderRange = screen.getByRole("progressbar");
    expect(sliderRange.style.left).toMatch(/\d+%/);
    expect(sliderRange.style.width).toMatch(/\d+%/);
  });

  test("initializes correctly in fixed mode", () => {
    render(<Range mode="fixed" values={[5, 15, 25]} />);

    const labels = screen
      .getAllByText(/€/i)
      .filter((el) => el.classList.contains("input-label"));

    expect(labels[0]).toHaveTextContent("5 €");
    expect(labels[1]).toHaveTextContent("25 €");
  });

  test("updates when switching modes", () => {
    const { rerender } = render(<Range mode="normal" min={0} max={50} />);
    rerender(<Range mode="fixed" values={[10, 20, 30]} />);
    expect(screen.getByText(/10 €/i)).toBeInTheDocument();
    expect(screen.getByText(/30 €/i)).toBeInTheDocument();
  });

  test("handles no values in fixed mode", () => {
    render(<Range mode="fixed" values={[]} />);
    const labels = screen.queryAllByText(/€/i);

    labels.forEach((label) => {
      expect(label).toHaveTextContent("€");
    });

    expect(labels.length).toBe(2);
  });

  test("prevents invalid min input values", () => {
    render(<Range />);
    fireEvent.click(screen.getByText(/1 €/i));
    const input = screen.getByDisplayValue("1");
    fireEvent.change(input, { target: { value: "200" } });
    fireEvent.blur(input);
    expect(screen.getByText(/1 €/i)).toBeInTheDocument();
  });

  test("prevents invalid max input values", () => {
    render(<Range />);
    fireEvent.click(screen.getByText(/100 €/i));
    const input = screen.getByDisplayValue("100");
    fireEvent.change(input, { target: { value: "-10" } });
    fireEvent.blur(input);
    expect(screen.getByText(/100 €/i)).toBeInTheDocument();
  });

  test("displays correct tooltip values", () => {
    render(<Range />);

    const tooltips = screen.getAllByRole("tooltip");

    expect(tooltips[0]).toHaveTextContent("1");
    expect(tooltips[1]).toHaveTextContent("100");
  });
});
