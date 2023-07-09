<template>
  <div class="header">
    <img src="@/assets/img/survey-line.svg" alt="list">
    <h1>TO DO LIST</h1>
  </div>
</template>
<script>

</script>
<style lang="scss">
.header {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $white;
  @include mq(md) {
    height: 52px;
  }
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
</style>