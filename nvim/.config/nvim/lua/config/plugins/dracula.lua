return {
	"Mofiqul/dracula.nvim",
	lazy = false,
	priority = 1000,
	config = function()
		require("dracula").setup({
			transparent_bg = true, -- set to true if you would like to enable transparency
			styles = {
				comments = { italic = true },
				keywords = { bold = true, italic = true },
				functions = { italic = true },
			},
		})
	end,
}
