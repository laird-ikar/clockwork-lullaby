import { get } from "http";
import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

export default class ClockworkLullaby extends Plugin {
	async onload() {
		this.addRibbonIcon("sun", "Open Today", async () => {
			const date = new Date();
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			try {
				await this.app.vault.createFolder(
					`Clockwork/${year}/${year}-${month}`
				);
			} catch (e) {}
			await this.app.workspace.openLinkText(
				`Clockwork/${year}/${year}-${month}/${year}-${month}-${day}.md`,
				"",
				false
			);
		});

		this.addRibbonIcon("moon", "Open This Month", async () => {
			const date = new Date();
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			try {
				await this.app.vault.createFolder(
					`Clockwork/${year}/${year}-${month}`
				);
			} catch (e) {}
			await this.app.workspace.openLinkText(
				`Clockwork/${year}/${year}-${month}/${year}-${month}.md`,
				"",
				false
			);
		});

		this.addRibbonIcon("star", "Open This Year", async () => {
			const date = new Date();
			const year = date.getFullYear();
			try {
				await this.app.vault.createFolder(`Clockwork/${year}`);
			} catch (e) {}
			await this.app.workspace.openLinkText(
				`Clockwork/${year}/${year}.md`,
				"",
				true
			);
		});

		this.addRibbonIcon("star", "Open This Week", async () => {
			const date = new Date();
			const year = date.getFullYear();
			var year_number = new Date(date.getFullYear(), 0, 1);
			var days = Math.floor(
				(Number(date) - Number(year_number)) / (24 * 60 * 60 * 1000)
			);
			const week = String(Math.ceil(days / 7)).padStart(2, "0");
			try {
				await this.app.vault.createFolder(`Clockwork/${year}`);
			} catch (e) {}
			await this.app.workspace.openLinkText(
				`Clockwork/${year}/${year}-W${week}.md`,
				"",
				false
			);
		});
	}

	onunload() {}
}
