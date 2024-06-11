
export default function canvasElementsFiltered(htmlCollection){
    let canvasElementsArray = Array.from(htmlCollection);
    let canvasElementsFilter = canvasElementsArray.filter((element) => {
      let pageNumSelect = Array.from(element.classList).includes("page-number");
      return !pageNumSelect
    })
    return canvasElementsFilter
  }