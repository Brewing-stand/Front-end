import {expect, it} from "vitest";
import {render} from "@testing-library/react";
import App from "../App.tsx";

it("Snapshot Navbar", () => {
    const {asFragment} = render(<App/>);
    expect(asFragment()).toMatchSnapshot();
});
