<template>
  <div class="page_403">
    <div class="container">
      <img src="./icon.png" class="icon" />
      <a href="javascript:history.back(-1)" class="btn_return">返回</a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .page_403{
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .container {
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -60%);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .icon{
    width:248px;
  }
  .hint{
    font-size: 18px;
    color: #333333;
    margin-top:20px;
  }
  .btn_return{
    width:200px;
    height:50px;
    background: #f67736;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    display: inline-block;
    border-radius: 25px;
    margin-top:40px;
  }
</style>
