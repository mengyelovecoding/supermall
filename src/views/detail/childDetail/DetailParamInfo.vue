<template>
  <div class="param-info">
    <table v-for="size in paramInfo.sizes">
      <tr v-for="itemX in size">
        <td v-for="itemY in itemX">{{ itemY }}</td>
      </tr>
    </table>
    <table>
      <tr v-for="item in paramInfo.infos">
        <td class="key">{{ item.key }}</td>
        <td class="value">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default: {},
    },
  },
};
</script>
<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.param-info table {
  width: 100%;
  /* border-collapse: collapse; */
}

.param-info table tr {
  height: 42px;
}

.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.key {
  width: 100px;
}
.value {
  color: #eb4868;
}
</style>