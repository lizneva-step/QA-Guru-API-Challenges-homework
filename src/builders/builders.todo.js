export class toDoBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.data = {
      title: "",
      doneStatus: false,
      description: ""
    };
    return this;
  }

  addTitle(title = "Наименование задания") {
    this.data.title = title;
    return this;
  }

  addDoneStatus(doneStatus = false) {
    this.data.doneStatus = doneStatus;
    return this;
  }

  addDescription(description = "Пройти по Абрикосовой, свернуть на Виноградную") { 
    this.data.description = description;
    return this;
  }

  moreThanMaxLengthTitle() {
    this.data.title = "Пройти по Абрикосовой свернуть на Виноградную далее"; //51
    return this;
  }

 withTooLongDescription() {
    this.data.description = "Пройти по улице Абрикосовой, внимательно следуя вдоль домов с номерами от 10 до 30, затем на перекрестке свернуть направо на улицу Виноградную. Двигаться прямо, минуя парк, лавочки и магазин, до следующего крупного перекрестка, где нужно будет остановиться."; // 201 символ
    return this;
  }

  withMaxLengthTitle() {
  this.data.title = "this title has just enough characters to validate.";
  return this;
}

withMaxLengthDescription() {
  this.data.description = "This description has just enough characters to validate because it is exactly 200 characters in length. I had to use a tool to check this - so I should have used a CounterString to be absolutely sure.";
  return this;
}

withExactMaxLengthDescription() {
    this.data.description = "A".repeat(5000); // 5000 
    return this;
  }

withMinimalUpdateData() {
    this.data = {
      title: "updated title"
    };
    return this;
  }

  generate() {
    const result = { ...this.data };
    this.reset();
    return result;
  }
}