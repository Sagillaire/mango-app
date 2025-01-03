# Mango App - Next.js Range Component Test

## Objective

This exercise aims to evaluate your coding skills with an everyday coding problem based on our team's design system needs.

## Exercise

You are tasked with creating a component named `<Range />` in a Next.js project using the `appDir` and TypeScript. There are two usage modes for the component: **Normal Range** and **Fixed Values Range**.

You **do NOT** need to use any CLI commands to create the structure and architecture of your application.

## Use Cases

### 1. Normal Range (Route: `/exercise1`)

For this use case, the component should behave as follows:

- **Custom Range**: The component **CANNOT** be an HTML5 input range. It must be a custom implementation.
- **Two Handles**: The user should be able to drag two handles along the range line.
- **Interactive Labels**: The user should be able to click on both the minimum and maximum number labels to set new values.
- **Value Limits**: The values should never be less than the minimum or greater than the maximum input values.
- **Handle Hover**: When a handle is hovered over, it should enlarge, and the cursor type should change to indicate that it's draggable.
- **Dragging Cursor**: When a handle is being dragged, the cursor should change to indicate that it is being moved.
- **No Crossing Handles**: The minimum and maximum values should never be crossed while adjusting the range.
- **Mocked HTTP Service**: A mocked HTTP service should provide the minimum and maximum values used for the component. For example: `{ min: 1, max: 100 }`. You can use a service like [Mockable.io](https://www.mockable.io/) or a custom mocked server.
- **Testing**: Implement as many unit/integration tests as possible.

### 2. Fixed Values Range (Route: `/exercise2`)

For this use case, the component should behave as follows:

- **Custom Range**: The component **CANNOT** be an HTML5 input range. It must be a custom implementation.
- **Fixed Values**: Given a fixed range of values, such as `[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]`, the user can only select values within this predefined range.
- **Mocked HTTP Service**: A mocked HTTP service should return the array of numbers: `[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]`. You can use a service like [Mockable.io](https://www.mockable.io/) or a custom mocked server.
- **No Input Changeable Values**: The currency values cannot be changed by input; they should only be displayed as labels.
- **Two Handles**: The user should be able to drag two handles along the range line.
- **No Crossing Handles**: The minimum and maximum values should never be crossed while adjusting the range.
- **Mocked Service**: The mocked service should provide the array of range values. For example: `{ rangeValues: [...] }`.
- **Testing**: Implement as many unit/integration tests as possible.

## Instructions

1. Set up your Next.js project with TypeScript and `appDir`.
2. Implement the two routes (`/exercise1` and `/exercise2`) using a custom range component for each use case.
3. Make use of mocked HTTP services to simulate fetching the necessary data for both ranges.
4. Ensure proper interactivity and accessibility for the custom range components.
5. Write tests to ensure all functionality is covered.

## Development Setup

1. Clone this repository or start a new Next.js project.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
