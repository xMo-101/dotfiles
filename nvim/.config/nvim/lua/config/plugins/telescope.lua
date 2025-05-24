return {
	"nvim-telescope/telescope.nvim",
	branch = "0.1.x",
	cond = not vim.g.vscode,
	dependencies = {
		"nvim-lua/plenary.nvim",
		{ "nvim-telescope/telescope-fzf-native.nvim", build = "make" },
		"nvim-tree/nvim-web-devicons",
		"folke/todo-comments.nvim",
		"nvim-telescope/telescope-ui-select.nvim",
	},
	config = function()
		local telescope = require("telescope")
		local actions = require("telescope.actions")
		local transform_mod = require("telescope.actions.mt").transform_mod

		local trouble = require("trouble")
		local trouble_telescope = require("trouble.sources.telescope")

		-- or create your custom action
		local custom_actions = transform_mod({
			open_trouble_qflist = function(prompt_bufnr)
				trouble.toggle("quickfix")
			end,
		})

		telescope.setup({
			extensions = {
				["ui-select"] = {
					require("telescope.themes").get_dropdown({}),
				},
			},
			defaults = {
				path_display = { "smart" },
				mappings = {
					i = {
						["<C-k>"] = actions.move_selection_previous, -- move to prev result
						["<C-j>"] = actions.move_selection_next, -- move to next result
						["<C-q>"] = actions.send_selected_to_qflist + custom_actions.open_trouble_qflist,
						["<C-t>"] = trouble_telescope.open,
					},
				},
			},
		})

		telescope.load_extension("fzf")
		-- To get ui-select loaded and working with telescope, you need to call
		-- load_extension, somewhere after setup function:
		require("telescope").load_extension("ui-select")

		-- set keymaps
		local keymap = vim.keymap -- for conciseness
		keymap.set("n", "<leader>fs", "<cmd>Telescope find_files<cr>", { desc = ".. Search" })
		keymap.set("n", "<leader>fr", "<cmd>Telescope oldfiles<cr>", { desc = ".. Search recent" })
		keymap.set("n", "<leader>fg", "<cmd>Telescope live_grep<cr>", { desc = ".. Grep String" })
		keymap.set("n", "<leader>ft", "<cmd>TodoTelescope<cr>", { desc = ".. Search todos" })
		keymap.set("n", "<leader>fb", "<cmd>Telescope buffers<cr>", { desc = ".. Search buffers" })
	end,
}
