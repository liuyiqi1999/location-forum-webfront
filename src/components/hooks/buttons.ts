export default function buttonsAction() {
  const textButtons = [
    {
      label: "B",
      value: "bold",
    },
    {
      label: "I",
      value: "italic",
    },
    {
      label: "H",
      value: "heading",
    },
    {
      label: "·",
      value: "ul",
    },
    {
      label: "1.",
      value: 'ol',
    },
  ];
  const clickButton = (value) => {
    switch(value){
      case 'bold':
        document.execCommand('bold');
        break;
      case 'italic':
        document.execCommand('italic');
        break;
      case 'heading':
        document.execCommand('formatBlock', false, '<h1>');
        break;
      case 'ul':
        document.execCommand('insertUnorderedList');
        break;
      case 'ol':
        document.execCommand('insertOrderedList');
        break;
    }
  };
  return {
    textButtons,
    clickButton,
  };
}
