export type RenderResult = {
    html: Function;
    instance: Function;
};
export type CustomRenderOptions = import("@testing-library/react").RenderOptions & {
    instance?: boolean | ((el: React.ReactElement) => void);
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
 * @typedef {import("@testing-library/react").RenderOptions & {
 *   instance?: boolean|((el: React.ReactElement) => void),
 * }} CustomRenderOptions
 */
/**
 * rtl-render: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
 *
 * @param {React.ReactElement} OrigDom
 * @param {CustomRenderOptions} [options]
 * @returns {import("@testing-library/react").RenderResult & RenderResult}
 */
export function render(OrigDom: React.ReactElement, options?: CustomRenderOptions): import("@testing-library/react").RenderResult & RenderResult;
export function screen(): {
    getByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined): ReturnType<queries.GetByText<T>>;
    getAllByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined): ReturnType<queries.AllByText<T>>;
    queryByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined): ReturnType<queries.QueryByText<T>>;
    queryAllByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined): ReturnType<queries.AllByText<T>>;
    findByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindByText<T>>;
    findAllByLabelText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindAllByText<T>>;
    getByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    findByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByPlaceholderText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindAllByBoundAttribute<T>>;
    getByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined): ReturnType<queries.GetByText<T>>;
    getAllByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined): ReturnType<queries.AllByText<T>>;
    queryByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined): ReturnType<queries.QueryByText<T>>;
    queryAllByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined): ReturnType<queries.AllByText<T>>;
    findByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindByText<T>>;
    findAllByText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindAllByText<T>>;
    getByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    findByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByAltText<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindAllByBoundAttribute<T>>;
    getByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    findByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByTitle<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindAllByBoundAttribute<T>>;
    getByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    findByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByDisplayValue<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindAllByBoundAttribute<T>>;
    getByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined): ReturnType<queries.GetByRole<T>>;
    getAllByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined): ReturnType<queries.AllByRole<T>>;
    queryByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined): ReturnType<queries.QueryByRole<T>>;
    queryAllByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined): ReturnType<queries.AllByRole<T>>;
    findByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindByRole<T>>;
    findAllByRole<T extends HTMLElement = HTMLElement>(role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindAllByRole<T>>;
    getByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.GetByBoundAttribute<T>>;
    getAllByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    queryByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.QueryByBoundAttribute<T>>;
    queryAllByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined): ReturnType<queries.AllByBoundAttribute<T>>;
    findByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindByBoundAttribute<T>>;
    findAllByTestId<T extends HTMLElement = HTMLElement>(id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined): ReturnType<queries.FindAllByBoundAttribute<T>>;
} & {
    getByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined) => HTMLElement;
    getAllByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined) => HTMLElement[];
    queryByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined) => HTMLElement | null;
    queryAllByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined) => HTMLElement[];
    findByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement>;
    findAllByLabelText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement[]>;
    getByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement;
    getAllByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    queryByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement | null;
    queryAllByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    findByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement>;
    findAllByPlaceholderText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement[]>;
    getByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined) => HTMLElement;
    getAllByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined) => HTMLElement[];
    queryByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined) => HTMLElement | null;
    queryAllByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined) => HTMLElement[];
    findByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement>;
    findAllByText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").SelectorMatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement[]>;
    getByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement;
    getAllByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    queryByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement | null;
    queryAllByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    findByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement>;
    findAllByAltText: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement[]>;
    getByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement;
    getAllByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    queryByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement | null;
    queryAllByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    findByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement>;
    findAllByTitle: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement[]>;
    getByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement;
    getAllByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    queryByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement | null;
    queryAllByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    findByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement>;
    findAllByDisplayValue: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement[]>;
    getByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined) => HTMLElement;
    getAllByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined) => HTMLElement[];
    queryByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined) => HTMLElement | null;
    queryAllByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined) => HTMLElement[];
    findByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement>;
    findAllByRole: (role: import("@testing-library/dom").ByRoleMatcher, options?: queries.ByRoleOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement[]>;
    getByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement;
    getAllByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    queryByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement | null;
    queryAllByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined) => HTMLElement[];
    findByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement>;
    findAllByTestId: (id: import("@testing-library/dom").Matcher, options?: import("@testing-library/dom").MatcherOptions | undefined, waitForElementOptions?: import("@testing-library/dom").waitForOptions | undefined) => Promise<HTMLElement[]>;
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
 * @param {{withoutJsdom?: boolean, debug?: any}} [props]
 */
export function cleanIt(props?: {
    withoutJsdom?: boolean;
    debug?: any;
}): void;
import { jsdom } from "reshow-unit-dom";
import { hideConsoleError } from "reshow-unit-dom";
import { hideConsoleWarn } from "reshow-unit-dom";
import * as React from "react";
import { queries } from "@testing-library/react";
export { waitFor, waitForElementToBeRemoved, sleep, getSinon, jsdom, hideConsoleError, hideConsoleWarn };
