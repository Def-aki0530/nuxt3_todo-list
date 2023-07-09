<template>
  <Header />
  <div class="wrapper">
    <template v-for="(item, index) in list" :key="index">
      <Memo 
        v-model:text=item.text 
        v-model:date=item.date 
        v-model:check=item.check
        @deleteMemo="deleteMemo(index)"
        @saveData="saveData"
      />
    </template>
    <AddButton @click="addMemo" />
    <template v-for="(item, index) in list" :key="index">
      <div>{{ item.text }}</div>
      <div>{{ item.date }}</div>
      <div>{{ item.check }}</div>
    </template>
  </div>
  
</template>
<script setup lang="ts">
interface Memo {
  text: string
  date: string | null
  check: Boolean
}

const list: Memo[] = ref([
  { text: 'aaa', date: null, check: false },
  { text: 'bbb', date: '2023-01-01', check: true },
  { text: 'ccc', date: null, check: false },    
])

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

const saveData = ():void => {
  let json = JSON.stringify(list, undefined, 1)
  localStorage.setItem('nuxt3ToDoList', json)
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
