<template>
  <div class="header">
    <div class="header-wrapper">
      <span></span>
      <div class="header-title">
        <img src="@/assets/img/survey-line.svg" alt="list">
        <h1>TO DO LIST</h1>
      </div>
      <div class="header-add-button" @click="unshiftMemo">
        <img src="@/assets/img/add-line.svg" alt="list">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits([
  'unshiftMemo',
])

const unshiftMemo = (): void => {
  emit('unshiftMemo')
}

</script>
<style lang="scss">
.header {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  background-color: $white;
  @include mq(md) {
    height: 52px;
  }
}

.header-wrapper {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  span {
    width: 36px;
  }
}

.header-title {
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  h1 {
    font-size: 14px;
    font-weight: 700;
    color: $gray;
  }
}

.header-add-button {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background-color: $bg-color;
  &:hover {
    background-color: $gray-white;
  }
}

</style>