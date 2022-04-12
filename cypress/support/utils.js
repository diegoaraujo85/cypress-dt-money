export const format = (value) => {
  let formattedValue = value;

  formattedValue = formattedValue.replace('.', '')
  formattedValue = formattedValue.replace(',', '.')
  formattedValue = formattedValue.split('$')[1].trim();
  formattedValue = Number(formattedValue)

  formattedValue = String(value).includes('-') ? -formattedValue : formattedValue

  return formattedValue
}

export const randomNumber = () => {
  return Math.floor(Math.random() * 101)
}

export const prepareLocalStorage = (win) => {
  win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
      {
        title: 'Pagamento',
        description: "Mesada",
        amount: randomNumber() * 100,
        type: "income",
        date: "11/03/2021"
      },
      {
        title: 'Gasto',
        description: 'Suco Kapo',
        amount: (randomNumber() * 100),
        type: 'withdraw',
        date: "12/03/2021"
      }
    ])
  )
}