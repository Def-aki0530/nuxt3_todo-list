<template>
  <Header />
  <div class="wrapper">
    <draggable v-model="list" item-key="no" tag="ul">
      <template #item="{ element, index }">
        <Memo
          v-model:text=element.text 
          v-model:date=element.date 
          v-model:check=element.check
          @deleteMemo="deleteMemo(index)"
        />
      </template>
    </draggable>
    <AddButton @click="addMemo()" />
  </div>
  
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
}

const list = ref([] as Memo[])

onMounted(() => {
  const json: any = localStorage.getItem('nuxt3ToDoList') === null ? '' : localStorage.getItem('nuxt3ToDoList')
  list.value = JSON.parse(json)
})

watch(
  list,
  () => {
    if (window.localStorage) {
      let json = JSON.stringify(list.value, undefined, 1)
      localStorage.setItem('nuxt3ToDoList', json)
    } else {
      alert('ブラウザのローカルストレージの設定を有効にしてください')
    }
  },
  { deep: true }
)

if (list.value == '') {
  const newMemo: Memo = {
    text: '',
    date: null,
    check: false
  }
  list.value.push(newMemo)
}

const deleteMemo = (index: number): void => {
  list.value.splice(index, 1)
}

const addMemo = (): void => {
  const newMemo: Memo = {
    text: '',
    date: null,
    check: false
  }
  list.value.push(newMemo)
}

</script>
<style lang="scss">
.wrapper {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  padding: 32px 20px;
}

</style>
