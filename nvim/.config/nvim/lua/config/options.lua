vim.opt.nu = true
vim.opt.relativenumber = true

vim.opt.tabstop = 2
vim.opt.softtabstop = 2
vim.opt.shiftwidth = 2
vim.opt.expandtab = true

vim.opt.smartindent = true

vim.opt.wrap = false

vim.opt.swapfile = false
vim.opt.backup = false
if vim.fn.has("win32") == 1 then
	vim.opt.undodir = os.getenv("USERPROFILE") .. "\\.vim\\undodir"
	vim.o.shell = "powershell" -- use powershell as shell if on windows
else
	vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
	vim.o.shell = "bash" -- use bash as shell if not on windows
end

vim.opt.undofile = true

vim.opt.incsearch = true

vim.opt.termguicolors = true
vim.api.nvim_set_hl(0, "NormalFloat", { bg = "NONE" })
vim.api.nvim_set_hl(0, "FloatBorder", { bg = "NONE" })

vim.opt.scrolloff = 8
vim.opt.signcolumn = "yes"
vim.opt.isfname:append("@-@")

vim.opt.updatetime = 50

vim.opt.cursorline = false -- Highlight the current line
vim.cmd("colorscheme github_dark_dimmed")
-- vim.opt.colorcolumn = "80"
