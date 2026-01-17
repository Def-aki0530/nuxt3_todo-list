<template>
  <div class="modal" @click="close"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2>詳細</h2>
      <button class="modal-close" aria-label="modal-close" @click="close">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="close-fill" d="M7.0007 5.5865L11.9504 0.636719L13.3646 2.05093L8.4149 7.0007L13.3646 11.9504L11.9504 13.3646L7.0007 8.4149L2.05093 13.3646L0.636719 11.9504L5.5865 7.0007L0.636719 2.05093L2.05093 0.636719L7.0007 5.5865Z"/>
        </svg>
      </button>
    </div>
    <textarea class="modal-textarea" wrap="soft" spellcheck="false"          
      v-model="information"
    ></textarea>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  id: String,
  index: Number,
})

const emit = defineEmits([
  'close',
  'information'
])

const information = ref('' as String)

onMounted(() => {
  if (window.localStorage) {
    const json: any = localStorage.getItem('nuxt3ToDoList' + props.id)
    const data = JSON.parse(json || 'null')
    const dataTarget = data[props.index].information
    if (dataTarget) {
      information.value = dataTarget
    } else {
      information.value = ''
    }
  } else {
    alert('ブラウザのローカルストレージの設定を有効にしてください')
  }
})

watch(
  information,
  () => {
    emit('information', information.value)
  },
)

const close = (): void => {
  emit('close')
}
</script>
<style scoped lang='scss'>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  // modal-style
  background-color: $white;
  max-width: 1280px;
  width: calc(100% - 60px);
  height: calc(100vh - 60px);
  border-radius: 4px;
  padding: 20px 24px;
}

.modal-header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 14px;
    font-weight: 700;
    color: $gray;
  }
}

.modal-close {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $white;
  border: none;
  border-radius: 15px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  &:hover { 
    background: $bg-color;
    .close-fill {
      fill: $gray;
    }
  }
  .close-fill {
    fill: $light-gray;
  }
}

.modal-textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  font-family: "Roboto", "Noto Sans JP";
  color: $text-black;
  resize: none;
  &:focus {
    border-bottom: 2px solid $light-gray;
  }
}
</style>