(function () {
	'use strict';
	// key: タスクの文字列 value: 完了しているかどうかの真偽値
	let tasks = new Map();
	
	let fs = require('fs');
	let fileName = './tasks.json';	

	/**
	 * タスクをファイルに保存する
	 */
	function saveTasks() {
		fs.writeFileSync(fileName, JSON.stringify(Array.from(tasks)), 'utf8');
	}
	
	// 同期的にファイルから復元
	try {
		let data = fs.readFileSync(fileName, 'utf8');
		tasks = new Map(JSON.parse(data));
	} catch (ignore) {
		console.log(fileName + 'から復元できませんでした');
	}

	/**
	 * TODOを追加する
	 * @param {string} task
	 */
	function todo(task) {
		tasks.set(task, false);
		saveTasks();
	}
	
	/**
	 * TODOの一覧の配列を取得する
	 * @return {array}
	 */
	function list() {
		return Array.from(tasks)
			.filter(t => !t[1])
			.map(t => t[0]);
	}
	
	/**
	 * TODOを完了状態にする
	 * @param {string} task
	 */
	function done(task) {
		if (tasks.has(task)) {
			tasks.set(task, true);
			saveTasks();
		}
	}
	
	/**
	 * 完了済みのタスクの一覧の配列を取得する
	 * @return {array}
	 */
	function donelist() {
		return Array.from(tasks)
			.filter(t => t[1])
			.map(t => t[0]);
	}
	
	/**
	 * 項目を削除する
	 * @param {string} task
	 */
	function del(task) {
		tasks.delete(task);
		saveTasks();
	}
	
	module.exports = {
		todo: todo,
		list: list,
		done: done,
		donelist: donelist,
		del: del
	};
})();