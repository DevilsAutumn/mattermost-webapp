// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/// <reference types="cypress" />

// ***************************************************************
// Each command should be properly documented using JSDoc.
// See https://jsdoc.app/index.html for reference.
// Basic requirements for documentation are the following:
// - Meaningful description
// - Specific link to https://api.mattermost.com
// - Each parameter with `@params`
// - Return value with `@returns`
// - Example usage with `@example`
// Custom command should follow naming convention of having `ui` prefix, e.g. `uiWaitUntilMessagePostedIncludes`.
// ***************************************************************

declare namespace Cypress {
    interface Chainable {

        /**
         * log out user
         *
         * @example
         *   cy.logout();
         */
        logout(): void;

        /**
         * Wait for a message to get posted as the last post.
         * @returns {string} returns true if found or fail a test if not.
         *
         * @example
         *   cy.getCurrentUserId().then((id) => {
         */
        getCurrentUserId(): string;

        /**
         * Wait for a message to get posted as the last post.
         * @param {string} message - message to check if includes in the last post
         * @returns {boolean} returns true if found or fail a test if not.
         *
         * @example
         *   const message = 'message';
         *   cy.postMessage(message);
         *   cy.uiWaitUntilMessagePostedIncludes(message);
         */
        uiWaitUntilMessagePostedIncludes(message: string): boolean;

        /**
         * Get nth post from the post list
         * @param {number} index - an identifier of a post
         * - zero (0)         : oldest post
         * - positive number  : from old to latest post
         * - negative number  : from new to oldest post
         * @returns {Element} response: Cypress-chainable Element
         *
         * @example
         *   cy.uiGetNthPost(-1);
         */
        uiGetNthPost(index: number): Element;

        /**
         * Post message via center textbox by directly injected in the textbox
         * @param {string} message - message to be posted
         * @returns void
         *
         * @example
         *  cy.uiPostMessageQuickly('Hello world')
         */
        uiPostMessageQuickly(message: string): void;

        /**
         * Clicks on a visible emoji in the emoji picker.
         * For emojis further down the page, search for that emoji in search bar and then use this command to click on it.
         * @param {string} emojiName - The name of emoji to click. For emojis with multiple names concat with ','. eg. slightly_frowning_face
         * @returns void
         *
         * @example
         *  cy.uiClickSystemEmoji('slightly_frowning_face');
         *  cy.uiClickSystemEmoji('star-struck,grinning_face_with_star_eyes');
         */
        clickEmojiInEmojiPicker(emojiName: string): void;

        /**
         * Get nth post from the post list
         * @returns {JQuery} response: Cypress-chainable JQuery
         *
         * @example
         *   cy.getLastPost().then((el: Element) => {;
         */
        getLastPost(): Chainable<JQuery>;

        /**
         * Get nth post from the post list
         * @returns {string} response: Cypress-chainable string
         *
         * @example
         *   cy.getLastPostId().then((postId) => {
         */
        getLastPostId(): Chainable<string>;

        /**
         * Go to a DM channel with a given user
         * @param {User} user - the user that should get the message
         * @example
         *   const user = {username: 'bob'};
         *   cy.uiGotoDirectMessageWithUser(user);
         */
        uiGotoDirectMessageWithUser(user: {username: string}): void
    }
}
