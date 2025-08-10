return {
	"akinsho/toggleterm.nvim",
	version = "*", -- use latest stable
	config = function()
		local toggleterm = require("toggleterm")
		toggleterm.setup({
			size = 20,
			open_mapping = [[<c-t>]],
			hide_numbers = false,
			shade_filetypes = {},
			shade_terminals = true,
			shading_factor = 2,
			start_in_insert = true,
			insert_mappings = true,
			persist_size = true,
			direction = "float",
			close_on_exit = false,
			shell = vim.o.shell,
			float_opts = {
				border = "single",
				width = 125,
				height = 25,
				winblend = 0,
			},
		})
	end,
}
