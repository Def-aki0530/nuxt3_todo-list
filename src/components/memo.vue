<template>
  <div class="memo">
    <div class="memo-draggable handle">
      <img src="@/assets/img/draggable.svg" alt="draggable">
    </div>
    <div class="memo-contents">
      <button class="memo-check" @click="switchCheck">
        <img src="@/assets/img/checkbox-circle-fill.svg" v-if="check">
        <img src="@/assets/img/checkbox-blank-circle-line.svg" v-else>
      </button>
      <div class="memo-detail">
        <textarea class="memo-text" maxlength="32" wrap="soft" spellcheck="false"
          v-bind:class="check ? 'color-light-gray' : 'color-black'"
          :value="text"          
          @input="emit('update:text', $event.target.value)"
        ></textarea>
        <div class="memo-data">
          <span class="memo-length">{{ text.length }}/32</span>
          <span></span>
          <div class="memo-date">
            <label 
              class="memo-calendar"
              v-bind:class="check ? 'memo-calendar-light-gray' : 'memo-calendar-gray'"
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
                v-bind:class="check ? 'color-light-gray' : 'color-gray'"
              >{{ dateFormat }}</span>
            </template>
          </div>
        </div>
      </div>
      <button class="memo-delete" @click="deleteMemo">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="close-fill" d="M7.0007 5.5865L11.9504 0.636719L13.3646 2.05093L8.4149 7.0007L13.3646 11.9504L11.9504 13.3646L7.0007 8.4149L2.05093 13.3646L0.636719 11.9504L5.5865 7.0007L0.636719 2.05093L2.05093 0.636719L7.0007 5.5865Z"/>
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  text: String,
  date: String,
  check: Boolean
})

const emit = defineEmits([
  'update:text', 
  'update:date',
  'update:check',
  'deleteMemo',
])

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

watch(
  () => props.date,
  updateDate
)

const deleteMemo = (): void => {
  emit('deleteMemo')
}

</script>
<style lang="scss">
.memo {
  width: 100%;
  max-width: 740px;
  height: 64px;
  display: flex;
  @include mq(md) {
    height: 96px;
  }
  @include mq(sm) {
    height: 116px;
  }
  &+& {
    margin-top: 8px;
  }
}

.memo-draggable {
  width: 40px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $white;
  border-radius: 4px 0 0 4px;
  margin-right: 4px;
  cursor: move;
  @include mq(md) {
    height: 96px;
  }
  @include mq(sm) {
    height: 116px;
  }
  img {
    width: 24px;
    height: 24px;
  }
}

.memo-contents {
  width: calc(100% - 44px);
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $white;
  border-radius: 0 4px 4px 0;
  padding: 12px;
  @include mq(md) {
    height: 96px;
  }
  @include mq(sm) {
    height: 116px;
  }
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
  width: calc(100% - 78px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include mq(md) {
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
  }
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

.memo-text {
  width: calc(100% - 140px);
  height: 24px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  font-family: "Roboto", "Noto Sans JP";
  white-space: pre-wrap;
  padding: 0;
  margin: 0;
  resize: none;
  overflow:hidden;
  &:focus {
    border-bottom: 2px solid $light-gray;
    &+.memo-data > .memo-length {
      display: block;
    }
  }
  @include mq(md) {
    width: 100%;
    height: 44px;
  }
  @include mq(sm) {
    width: 100%;
    height: 64px;
  }
}

.memo-data {
  width: 132px;
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

.memo-date {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.memo-date-text {
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
}

.memo-calendar {
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  input[type=date] {
    position: relative;
    width: 16px;
    height: 16px;
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
    width: 16px;
    height: 16px;
    background-image: url("@/assets/img/calendar-line-gray.svg");
  }
}

.memo-calendar-light-gray {
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    background-image: url("@/assets/img/calendar-line-light-gray.svg");
  }
}

.memo-delete {
  width: 30px;
  height: 30px;
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