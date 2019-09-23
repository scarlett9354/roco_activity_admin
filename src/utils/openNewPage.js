import * as MainTypes from '@/store/types/main'
export default function openNewPage(vm, name) {
  console.log(vm.$store.state.main)
  let pageList = vm.$store.state.main.pageList
  let pageOpened = false
  pageList.forEach((item, index) => {
    if(name === item.name) {
      pageOpened = true
      return false
    }
  })

  if(!pageOpened) {
    console.log(vm.$store.state.main.tagList)
    let menu = vm.$store.state.main.tagList[name]
    vm.$store.commit(MainTypes.MAIN_ADD_OPEN_PAGE, menu)
  }
}
