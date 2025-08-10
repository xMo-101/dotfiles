return {
	"github/copilot.vim",
	name = "github-copilot",
	-- event = "InsertEnter", -- load only when you start typing
	config = function()
		-- Enable Copilot globally
		vim.g.copilot_enabled = 0

		-- Optional: enable tab completion integration
		vim.g.copilot_no_tab_map = true
		vim.api.nvim_set_keymap("i", "<C-J>", 'copilot#Accept("<CR>")', { silent = true, expr = true })
	end,
}
