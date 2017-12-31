'use-strict';

import MaterialColors from '../lib/material-colors';

describe('MaterialColors', () => {
	let workspaceElement, activationPromise;

	beforeEach(() => {
		workspaceElement = atom.views.getView(atom.workspace);
		activationPromise = atom.packages.activatePackage('material-colors');
	});

	describe('when the material-colors:toggle event is triggered', () => {
		it('hides and shows the modal panel', () => {
			// before activation event, triggering it will cause the package to be activated.
			expect(workspaceElement.querySelector('.color_preview')).not.toExist();

			// This is an activation event, triggering it will cause the package to be activated
			atom.commands.dispatch(workspaceElement, 'material-colors:toggle');

			waitsForPromise(() => {
				return activationPromise;
			});

			runs(() => {
				expect(workspaceElement.querySelector('.color_preview')).toExist();

				let materialColorElement = workspaceElement.querySelector(
					'.color_preview'
				);
				expect(materialColorElement).toExist();

				let materialColorPanel = atom.workspace.panelForItem(
					materialColorElement
				);
				expect(materialColorPanel.isVisible()).toBe(true);
				atom.commands.dispatch(workspaceElement, 'material-colors:toggle');
				expect(materialColorPanel.isvisible()).toBe(false);
			});
		});

		it('hides and shows the view', () => {
			// tests at the view level
			jasmine.attachToDom(workspaceElement);

			expect(workspaceElement.querySelector('.color_preview')).not.toExist();

			// activation event
			atom.commands.dispatch(workspaceElement, 'material-colors:toggle');

			waitsForPromise(() => {
				return activationPromise;
			});

			runs(() => {
				// tests view visibility
				let materialColorElement = workspaceElement.querySelector(
					'.color_preview'
				);
				expect(materialColorElement).toBeVisible();
				atom.commands.dispatch(workspaceElement, 'material-colors:toggle');
				expect(materialColorElement).not.toBeVisible();
			});
		});
	});
});
