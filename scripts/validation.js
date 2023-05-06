export const isValidText = (name, value) => {
  if (!value) {
    return {
      valid: false,
      message: `Поле ${name} обязательное`
    }
  } 
  if (value.length < 2) {
    return {
      valid: false,
      message: `Поле ${name} слишком короткое`
    }
  }
  if(value.length > 20) {
    return {
      valid: false,
      message: `Поле ${name} слишком длинное`
    }
  }
  return {
    valid: true,
    message: ""
  }
}

export const isValidHttpUrl = (name, value) => {
  let url;
  if(!value) return {
    valid: false,
    message: "Загрузите картинку в поле слева или вставьте ссылку на неё из интернета"
  };
  try {
    url = new URL(value);
  } catch (_) {
    return {
      valid: false,
      message: "Неправильная ссылка на картинку"
    };
  }
  if(url.protocol === "http:" || url.protocol === "https:") {
    return {
      valid: true,
      message: ""
    }
  } else {
    return {
      valid: false,
      message: "Неправильная ссылка на картинку"
    };
  }
}