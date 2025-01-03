const KeyPress = (e) => {
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

export default KeyPress