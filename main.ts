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
	async openDaily() {
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		await this.makeFolder(`Clockwork/${year}/${year}-${month}`);
		await this.app.workspace.openLinkText(
			`Clockwork/${year}/${year}-${month}/${year}-${month}-${day}.md`,
			"",
			false
		);
	}

	async openMonthly() {
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		await this.makeFolder(`Clockwork/${year}/${year}-${month}`);
		await this.app.workspace.openLinkText(
			`Clockwork/${year}/${year}-${month}/${year}-${month}.md`,
			"",
			false
		);
	}

	async openYearly() {
		const date = new Date();
		const year = date.getFullYear();
		await this.makeFolder(`Clockwork/${year}`);
		await this.app.workspace.openLinkText(
			`Clockwork/${year}/${year}.md`,
			"",
			true
		);
	}

	async openWeekly() {
		const date = new Date();
		const year = date.getFullYear();
		var year_number = new Date(date.getFullYear(), 0, 1);
		var days = Math.floor(
			(Number(date) - Number(year_number)) / (24 * 60 * 60 * 1000)
		);
		const week = String(Math.ceil(days / 7)).padStart(2, "0");
		await this.makeFolder(`Clockwork/${year}/week`);
		await this.app.workspace.openLinkText(
			`Clockwork/${year}/week/${year}-W${week}.md`,
			"",
			false
		);
	}

	async makeFolder(path: string) {
		new Notice(path);
		if (path == "") return;
		if (this.app.vault.getAbstractFileByPath(path)) return;
		if (path.contains("/"))
			await this.makeFolder(path.split("/").slice(0, -1).join("/"));
		await this.app.vault.createFolder(path);
	}

	async onload() {
		this.addRibbonIcon("sun", "Open Today", async () => {
			await this.openDaily;
		});

		this.addRibbonIcon("moon", "Open This Month", async () => {
			await this.openMonthly;
		});

		this.addRibbonIcon("sun-moon", "Open This Year", async () => {
			await this.openYearly;
		});

		this.addRibbonIcon("star", "Open This Week", async () => {
			await this.openWeekly;
		});

		this.addCommand({
			id: "open-daily",
			name: "Open Today",
			callback: async () => {
				await this.openDaily;
			},
		});

		this.addCommand({
			id: "open-monthly",
			name: "Open This Month",
			callback: async () => {
				await this.openMonthly;
			},
		});

		this.addCommand({
			id: "open-yearly",
			name: "Open This Year",
			callback: async () => {
				await this.openYearly;
			},
		});

		this.addCommand({
			id: "open-weekly",
			name: "Open This Week",
			callback: async () => {
				await this.openWeekly;
			},
		});
	}

	onunload() {}
}
