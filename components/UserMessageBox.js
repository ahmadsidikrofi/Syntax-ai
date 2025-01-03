const UserMessageBox = ({ setEditContent, input, handleInputChange, handleSubmit }) => {
    const handleKeyPress = (e) => {
        const isMobileDevice = window.innerWidth <= 768
        if (e.key === 'Enter' && e.shiftKey) {
            const cursorPosition = e.target.selectionStart;
            const updatedValue =
                input.slice(0, cursorPosition) + "\n" + input.slice(cursorPosition);
            handleInputChange({ target: { value: updatedValue } })
            setEditContent(e.target.value)
            e.target.scrollTop = e.target.scrollHeight
            e.preventDefault();
        } else if (isMobileDevice && e.key === "Enter") {
            const cursorPosition = e.target.selectionStart;
            const updatedValue =
                input.slice(0, cursorPosition) + "\n" + input.slice(cursorPosition);
            handleInputChange({ target: { value: updatedValue } })
            setEditContent(e.target.value)
            e.target.scrollTop = e.target.scrollHeight
            e.preventDefault();
        } else if (!isMobileDevice && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <textarea
            className="flex-1 dark:bg-black bg-slate-100 dark:text-white text-slate-800 pt-3 pb-6 px-5 mb-8 rounded-[15px] shadow-xl mx-auto focus:outline-none focus:ring-0 placeholder:text-slate-800 dark:placeholder:text-white dark:caret-white caret-black resize-none scrollbar-hide"
            value={input}
            placeholder="Ketik apapun"
            onChange={(e) => {
                handleInputChange(e)
                const lines = e.target.value.split(/\r\n|\r|\n/).length
                e.target.style.height = `${Math.min(100 + (lines - 1) * 24, 100 + 4 * 24)}px`
            }}
            onKeyDown={(e) => handleKeyPress(e)}
            style={{
                height: `${Math.min(100 + (input.split(/\r\n|\r|\n/).length - 1) * 24, 100 + 4 * 24)}px`,
                lineHeight: '24px',
            }}
        >
        </textarea>
    )
}
export default UserMessageBox