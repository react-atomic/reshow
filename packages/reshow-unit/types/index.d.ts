export type RenderResult = {
    html: Function;
    instance: Function;
};
import { waitFor } from "@testing-library/dom";
import { waitForElementToBeRemoved } from "@testing-library/dom";
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
    getByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): ReturnType<queries.GetByText<T>>;
    getAllByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): ReturnType<queries.AllByText<T>>;
    queryByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): ReturnType<queries.QueryByText<T>>;
    queryAllByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): ReturnType<queries.AllByText<T>>;
    findByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindByText<T>>;
    findAllByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindAllByText<T>>;
    getByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    findByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindAllByBoundAttribute<T>>;
    getByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): ReturnType<queries.GetByText<T>>;
    getAllByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): ReturnType<queries.AllByText<T>>;
    queryByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): ReturnType<queries.QueryByText<T>>;
    queryAllByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions): ReturnType<queries.AllByText<T>>;
    findByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindByText<T>>;
    findAllByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindAllByText<T>>;
    getByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    findByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindAllByBoundAttribute<T>>;
    getByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    findByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindAllByBoundAttribute<T>>;
    getByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    findByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindAllByBoundAttribute<T>>;
    getByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions): ReturnType<queries.GetByRole<T>>;
    getAllByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions): ReturnType<queries.AllByRole<T>>;
    queryByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions): ReturnType<queries.QueryByRole<T>>;
    queryAllByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions): ReturnType<queries.AllByRole<T>>;
    findByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindByRole<T>>;
    findAllByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindAllByRole<T>>;
    getByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions): ReturnType<queries.AllByBoundAttribute<T>>;
    findByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions): ReturnType<queries.FindAllByBoundAttribute<T>>;
} & {
    getByLabelText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions) => HTMLElement;
    getAllByLabelText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions) => HTMLElement[];
    queryByLabelText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions) => HTMLElement;
    queryAllByLabelText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions) => HTMLElement[];
    findByLabelText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement>;
    findAllByLabelText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement[]>;
    getByPlaceholderText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    getAllByPlaceholderText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    queryByPlaceholderText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    queryAllByPlaceholderText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    findByPlaceholderText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement>;
    findAllByPlaceholderText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement[]>;
    getByText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions) => HTMLElement;
    getAllByText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions) => HTMLElement[];
    queryByText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions) => HTMLElement;
    queryAllByText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions) => HTMLElement[];
    findByText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement>;
    findAllByText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").SelectorMatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement[]>;
    getByAltText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    getAllByAltText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    queryByAltText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    queryAllByAltText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    findByAltText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement>;
    findAllByAltText: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement[]>;
    getByTitle: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    getAllByTitle: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    queryByTitle: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    queryAllByTitle: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    findByTitle: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement>;
    findAllByTitle: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement[]>;
    getByDisplayValue: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    getAllByDisplayValue: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    queryByDisplayValue: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    queryAllByDisplayValue: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    findByDisplayValue: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement>;
    findAllByDisplayValue: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement[]>;
    getByRole: (role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement;
    getAllByRole: (role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement[];
    queryByRole: (role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement;
    queryAllByRole: (role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions) => HTMLElement[];
    findByRole: (role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement>;
    findAllByRole: (role: import("@testing-library/react").ByRoleMatcher, options?: queries.ByRoleOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement[]>;
    getByTestId: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    getAllByTestId: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    queryByTestId: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement;
    queryAllByTestId: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions) => HTMLElement[];
    findByTestId: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement>;
    findAllByTestId: (id: import("@testing-library/react").Matcher, options?: import("@testing-library/react").MatcherOptions, waitForElementOptions?: import("@testing-library/react").waitForOptions) => Promise<HTMLElement[]>;
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
import { queries } from "@testing-library/react";
export { waitFor, waitForElementToBeRemoved, sleep, getSinon, jsdom, hideConsoleError };
