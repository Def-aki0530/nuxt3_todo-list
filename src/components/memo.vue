<template>
  <div class="memo">
    <div class="memo-draggable handle">
      <img src="@/assets/img/draggable.svg" alt="draggable">
    </div>
    <div class="memo-contents">
      <div class="memo-detail">
        <div class="check-container">
          <button class="memo-check" @click="switchCheck">
            <img src="@/assets/img/checkbox-circle-fill.svg" alt="on" v-if="check">
            <img src="@/assets/img/checkbox-blank-circle-line.svg" alt="off" v-else>
          </button>
        </div>
        <textarea 
          v-model="localText"
          ref="textareaRef"
          class="memo-text"
          wrap="soft"
          spellcheck="false"
          :class="[
            check ? 'color-light-gray' : 'color-black',
            { 'is-single': isSingleLine }
          ]"
          @input="onInput"
        ></textarea>
      </div>
      <div class="memo-process">
        <div class="memo-info">
          <button class="memo-information" @click="showModal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path :class="check && information.length ? 'fill-light-gray' : information.length ? 'fill-gray' : 'fill-light-gray'" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path>
            </svg>
          </button>
          <div class="memo-date">
            <label 
              class="memo-calendar"
              :class="check ? 'memo-calendar-light-gray' : 'memo-calendar-gray'"
            >
              <input 
                type="date" 
                :value="date"
                @input="emit('update:date', $event.target.value)"
                @change="updateDate"
              >
            </label>
            <template v-if="date">
              <span 
                class="memo-date-text"
                :class="check ? 'color-light-gray' : 'color-gray'"
              >{{ dateFormat }}</span>
            </template>
          </div>
        </div>
        <button class="memo-delete" aria-label="delete-button" @click="deleteMemo">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="close-fill" d="M7.0007 5.5865L11.9504 0.636719L13.3646 2.05093L8.4149 7.0007L13.3646 11.9504L11.9504 13.3646L7.0007 8.4149L2.05093 13.3646L0.636719 11.9504L5.5865 7.0007L0.636719 2.05093L2.05093 0.636719L7.0007 5.5865Z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  text: String,
  date: String,
  check: Boolean,
  information: String
})

const emit = defineEmits([
  'update:text', 
  'update:date',
  'update:check',
  'deleteMemo',
  'showModal'
])

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const isSingleLine = ref(true)


const resizeTextarea = () => {
  if (!textareaRef.value) return
  const el = textareaRef.value

  isSingleLine.value = false
  el.style.height = 'auto'

  nextTick(() => {
    const rawLines = el.value.split('\n')

    const hasMultipleLines = rawLines.length > 1

    isSingleLine.value = !hasMultipleLines

    if (isSingleLine.value) {
      el.style.height = '32px'
    } else {
      el.style.height = el.scrollHeight + 'px'
    }
  })
}

const localText = ref(props.text ?? '')

watch(
  () => props.text,
  (v: string | undefined) => {
    localText.value = v ?? ''
  }
)

const onInput = () => {
  emit('update:text', localText.value)
  nextTick(resizeTextarea)
}

onMounted(() => {
  nextTick(resizeTextarea)
})

watch(
  () => props.text,
  () => nextTick(resizeTextarea),
)

const checkFlag = ref(props.check as boolean)
const switchCheck = (): void => {
  checkFlag.value = !checkFlag.value
  emit('update:check', checkFlag.value)
}

const dayjs = useDayjs()
const dateFormat = ref(dayjs(props.date).format('MM/DD (ddd)') as string)

const updateDate = (): void => {
  dateFormat.value = dayjs(props.date).format('MM/DD (ddd)')
}

watch(() => props.date, updateDate)

const showModal = (): void => emit('showModal')
const deleteMemo = (): void => emit('deleteMemo')

</script>
<style scoped lang="scss">
.memo {
  width: 100%;
  display: flex;
  gap: 4px;
}

.memo-draggable {
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: $white;
  cursor: move;
  img {
    width: 24px;
    height: 24px;
  }
}

.memo-contents {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: $white;
  border-radius: 4px;
  padding: 12px;
  @include mq(md) {
    flex-direction: column-reverse;
  }
}

.check-container {
  height: 32px;
  display: flex;
  align-items: center;
}
.memo-check {
  width: 24px;
  height: 24px;
  background: $white;
  border: none;
  border-radius: 12px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  &:hover { 
    background: $bg-color;
  }
}

.memo-detail {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  @include mq(md) {
    width: 100%;
  }
}

.memo-process {
  height: 32px;
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 8px;
  @include mq(md) {
    width: 100%;
    height: 24px;
    justify-content: space-between;
    padding-left: 36px;
  }
}

.memo-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-light-gray {
  color: $light-gray;
}

.color-gray {
  color: $gray;
}

.color-black {
  color: $text-black;
}

.fill-light-gray {
  fill: $light-gray;
}

.fill-bg {
  fill: $bg-color;
}

.fill-gray {
  fill: $gray;
}

.memo-text {
  flex: 1;
  height: auto;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  font-family: "Roboto", "Noto Sans JP";
  white-space: pre-wrap;
  line-height: 24px;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
  resize: none;
  overflow: hidden;
  &:focus {
    border-bottom: 2px solid $light-gray;
  }
  @include mq(md) {
    width: 100%;
  }
}

.memo-text.is-single {
  line-height: 32px;
}

.memo-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include mq(md) {
    width: 100%;
  }
}

.memo-length {
  display: none;
  font-size: 14px;
  font-weight: 500;
  color: $light-gray;
  margin-right: 8px;
}

.memo-information {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background: $bg-color;
    path {
      fill: $light-gray;
    }
  }
}

.memo-date {
  height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.memo-date-text {
  font-size: 14px;
  font-weight: 500;
}

.memo-calendar {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  input[type=date] {
    position: relative;
    width: 18px;
    height: 18px;
    border: none;
    outline: none;
    background: none;
    opacity: 0;
    padding: 0;
    margin: 0;
    &::-webkit-inner-spin-button{
      -webkit-appearance: none;
    }
    &::-webkit-clear-button{
      -webkit-appearance: none;
    }
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  }
}

.memo-calendar-gray {
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background-image: url("@/assets/img/calendar-line-gray.svg");
    background-repeat: no-repeat;
  }
}

.memo-calendar-light-gray {
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background-image: url("@/assets/img/calendar-line-light-gray.svg");
    background-repeat: no-repeat;
  }
}

.memo-delete {
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
</style>