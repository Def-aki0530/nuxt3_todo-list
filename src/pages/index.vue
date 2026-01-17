<template>
  <Header 
    :pick="picked"
    v-model:picked="picked"
    @addMemo="addMemo('unshift')"
  />
  <div class="wrapper">
    <draggable v-model="list" item-key="id" animation="300" handle=".handle" class="memo-list">
      <template #item="{ element, index }">
        <Memo
          v-model:text="element.text"
          v-model:date="element.date"
          v-model:check="element.check"
          :information="element.information"
          @deleteMemo="deleteMemo(index)"
          @showModal="showModal(index)"
        />
      </template>
    </draggable>
    <AddButton @click="addMemo('push')" />
  </div>
  <Modal 
    v-if="modalVisible"
    :id="picked"
    :index="modalIndex"
    @close="closeModal"
    @information="updateInformation"
    
  />
</template>
<script setup lang="ts">
import draggable from 'vuedraggable'

const components = {
  draggable: draggable
}

interface Memo {
  text: string
  date: string | null
  check: Boolean
  information: string
}

const list = ref([] as Array<Memo>)
const picked = ref('' as String)

onMounted(() => {
  if (window.localStorage) {
    const listId: any = localStorage.getItem('nuxt3ToDoListId')
    if (listId == '1' || listId == '2') {
      picked.value = listId
    } else {
      picked.value = '1'
    }
    const json: any = localStorage.getItem('nuxt3ToDoList' + picked.value)
    const data = JSON.parse(json || 'null')
    if (data) {
      list.value = data
    } else {
      list.value = []
      addMemo('push')
    }
  } else {
    alert('ブラウザのローカルストレージの設定を有効にしてください')
  }
})

watch(
  list,
  () => {
    if (window.localStorage) {
      let json = JSON.stringify(list.value, undefined, 1)
      localStorage.setItem('nuxt3ToDoList' + picked.value, json)
    } else {
      alert('ブラウザのローカルストレージの設定を有効にしてください')
    }
  },
  { deep: true }
)

watch(
  picked,
  () => {
    if (window.localStorage) {
      localStorage.setItem('nuxt3ToDoListId', picked.value)
      const json: any = localStorage.getItem('nuxt3ToDoList' + picked.value)
      const data = JSON.parse(json || 'null')
      if (Array.isArray(data) && data.length !== 0) {
        list.value = data
      } else {
        list.value = []
        addMemo('push')
      }
    } else {
      alert('ブラウザのローカルストレージの設定を有効にしてください')
    }
  }
)

const deleteMemo = (index: number): void => {
  list.value.splice(index, 1)
}

const addMemo = (option: string): void => {
  const newMemo: Memo = {
    text: '',
    date: null,
    check: false,
    information: ''
  }
  if (option == 'push') {
    list.value.push(newMemo)
  }
  if ( option == 'unshift') {
    list.value.unshift(newMemo)
  }
}

const modalVisible = ref(false as boolean)
const modalIndex = ref(0 as number)
const closeModal = (): void => {
  modalVisible.value = false
}
const showModal = (index: number): void => {
  modalVisible.value = true
  modalIndex.value = index
}

const updateInformation = (informationText: string): void => {
  list.value[modalIndex.value].information = informationText
}
</script>
<style lang="scss">
.wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px 20px;
  @include mq(md) {
    padding: 32px 20px;
  }
}

.memo-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
