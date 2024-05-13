export type RenderResult = {
    html: Function;
    instance: Function;
};
import { waitFor } from "@testing-library/dom/types/wait-for";
import { waitForElementToBeRemoved } from "@testing-library/dom/types/wait-for-element-to-be-removed";
/**
 * @param {function} cb
 */
export function act(cb?: Function, milliseconds?: number, debug?: boolean): Promise<void>;
/**
 * @typedef {Object} RenderResult
 * @property {function} html
 * @property {function} instance
 */
/**
 * rtl-render: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
 *
 * @param {React.ReactElement} OrigDom
 * @param {object} options
 * @returns {import("@testing-library/react").RenderResult & RenderResult}
 */
export function render(OrigDom: React.ReactElement, options?: object): import("@testing-library/react").RenderResult & RenderResult;
export function screen(): {
    getByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions): T;
    getAllByLabelText<T_1 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions): T_1[];
    queryByLabelText<T_2 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions): T_2;
    queryAllByLabelText<T_3 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions): T_3[];
    findByLabelText<T_4 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_4>;
    findAllByLabelText<T_5 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_5[]>;
    /**
     * @param {string} role
     * @returns {string}
     */
    getByPlaceholderText<T_6 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_6;
    getAllByPlaceholderText<T_7 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_7[];
    queryByPlaceholderText<T_8 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_8;
    queryAllByPlaceholderText<T_9 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_9[];
    findByPlaceholderText<T_10 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_10>;
    findAllByPlaceholderText<T_11 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_11[]>;
    getByText<T_12 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions): T_12;
    getAllByText<T_13 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions): T_13[];
    queryByText<T_14 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions): T_14;
    queryAllByText<T_15 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions): T_15[];
    findByText<T_16 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_16>;
    findAllByText<T_17 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_17[]>;
    getByAltText<T_18 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_18;
    getAllByAltText<T_19 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_19[];
    queryByAltText<T_20 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_20;
    queryAllByAltText<T_21 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_21[];
    findByAltText<T_22 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_22>;
    findAllByAltText<T_23 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_23[]>;
    getByTitle<T_24 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_24;
    getAllByTitle<T_25 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_25[];
    queryByTitle<T_26 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_26;
    queryAllByTitle<T_27 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_27[];
    findByTitle<T_28 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_28>;
    findAllByTitle<T_29 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_29[]>;
    getByDisplayValue<T_30 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_30;
    getAllByDisplayValue<T_31 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_31[];
    queryByDisplayValue<T_32 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_32;
    queryAllByDisplayValue<T_33 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_33[];
    findByDisplayValue<T_34 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_34>;
    findAllByDisplayValue<T_35 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_35[]>;
    getByRole<T_36 extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions): T_36;
    getAllByRole<T_37 extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions): T_37[];
    queryByRole<T_38 extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions): T_38;
    queryAllByRole<T_39 extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions): T_39[];
    findByRole<T_40 extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_40>;
    findAllByRole<T_41 extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_41[]>;
    getByTestId<T_42 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_42;
    getAllByTestId<T_43 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_43[];
    queryByTestId<T_44 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_44;
    queryAllByTestId<T_45 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions): T_45[];
    findByTestId<T_46 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_46>;
    findAllByTestId<T_47 extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions): Promise<T_47[]>;
} & {
    getByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions) => HTMLElement;
    getAllByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions) => HTMLElement[];
    queryByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions) => HTMLElement;
    queryAllByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions) => HTMLElement[];
    findByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement>;
    findAllByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement[]>;
    getByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    getAllByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    queryByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    queryAllByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    findByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement>;
    findAllByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement[]>;
    getByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions) => HTMLElement;
    getAllByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions) => HTMLElement[];
    queryByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions) => HTMLElement;
    queryAllByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions) => HTMLElement[];
    findByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement>;
    findAllByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement[]>;
    getByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    getAllByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    queryByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    queryAllByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    findByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement>;
    findAllByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement[]>;
    getByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    getAllByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    queryByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    queryAllByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    findByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement>;
    findAllByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement[]>;
    getByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    getAllByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    queryByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    queryAllByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    findByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement>;
    findAllByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement[]>;
    getByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement;
    getAllByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement[];
    queryByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement;
    queryAllByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement[];
    findByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement>;
    findAllByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement[]>;
    getByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    getAllByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    queryByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement;
    queryAllByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions) => HTMLElement[];
    findByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement>;
    findAllByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions, waitForElementOptions?: import("@testing-library/dom").waitForOptions) => Promise<HTMLElement[]>;
};
/**
 * @param {ConstructorParameters<any>} p
 */
export function simulateEvent(...p: ConstructorParameters<any>): any;
import { sleep } from "reshow-unit-dom";
/**
 * @param {string} role
 * @returns {string}
 */
export function getRoleHtml(role: string): string;
import { getSinon } from "reshow-unit-dom";
/**
 * @param {Object} [props]
 */
export function cleanIt(props?: any): void;
import { jsdom } from "reshow-unit-dom";
import { hideConsoleError } from "reshow-unit-dom";
import { queries } from "@testing-library/dom";
export { waitFor, waitForElementToBeRemoved, sleep, getSinon, jsdom, hideConsoleError };
