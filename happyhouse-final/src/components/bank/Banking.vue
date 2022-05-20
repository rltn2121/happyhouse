<template>
  <div class="container">
    은행업무
    <div class="card">
      <div class="card-header">대출/상환/예금</div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <label for="bank">은행</label>
            <select name="bank" id="bank">
              <option value="0">신한</option>
              <option value="1">하나</option>
              <option value="2">우리</option>
              <option value="3">농협</option>
            </select>
          </div>
          <div class="col">
            <label for="work">업무</label>
            <select name="work" id="work">
              <option value="0">대출</option>
              <option value="1">상환</option>
              <option value="2">예금</option>
              <option value="3">출금</option>
            </select>
          </div>
          <div class="col">
            <label for="price">금액</label>
            <input type="text" />
          </div>
          <button type="button" class="btn btn-primary">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
