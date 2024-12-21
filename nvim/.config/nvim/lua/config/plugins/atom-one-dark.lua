return {
	{
		"navarasu/onedark.nvim",
		config = function()
			local transparent = true -- set to true if you would like to enable transparency
			require("onedark").setup({
				style = "dark", -- Available options: 'dark', 'darker', 'cool', 'deep', 'warm', 'warmer', 'light', and 'vivid'
				code_style = {
					comments = "italic", -- Enable italic comments
					keywords = "italic", -- Enable italic keywords
					functions = "none",
					strings = "none",
					variables = "none",
				},
			})
			require("onedark").load()
		end,
	},
}
