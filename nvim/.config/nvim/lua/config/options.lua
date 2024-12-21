vim.opt.nu = true
vim.opt.relativenumber = true

vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

vim.opt.smartindent = true

vim.opt.wrap = false

vim.opt.swapfile = false
vim.opt.backup = false
if vim.fn.has("win32") == 1 then
	vim.opt.undodir = os.getenv("USERPROFILE") .. "\\.vim\\undodir"
else
	vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
end

vim.opt.undofile = true

vim.opt.incsearch = true

vim.opt.termguicolors = true

vim.opt.scrolloff = 8
vim.opt.signcolumn = "yes"
vim.opt.isfname:append("@-@")

vim.opt.updatetime = 50

vim.opt.cursorline = true -- Highlight the current line
vim.api.nvim_set_hl(0, "CursorLine", { bg = "#2E3440", fg = "NONE" }) -- Set the highlight-color of the current line
-- vim.opt.colorcolumn = "80"
