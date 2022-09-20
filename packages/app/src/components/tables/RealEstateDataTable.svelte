<script lang="ts">
  export let data;
</script>

<table class="table table-compact w-full">
  <thead class="sticky-header">
    <tr>
      <th>No.</th>
      <th>Transaction date</th>
      <th>House age</th>
      <th>Distance to nearest MRT station</th>
      <th>No. of convenience stores</th>
      <th>Lattitude</th>
      <th>Longitude</th>
      <th>House price</th>
    </tr>
  </thead>
  <tbody>
    {#each data as item, index}
      <tr>
        <th>{item.No}</th>
        <td>{item["X1 transaction date"]}</td>
        <td>{item["X2 house age"]}</td>
        <td>{item["X3 distance to the nearest MRT station"]}</td>
        <td>{item["X4 number of convenience stores"]}</td>
        <td>{item["X5 latitude"]}</td>
        <td>{item["X6 longitude"]}</td>
        <td>{item["Y house price of unit area"]}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sticky-header {
    position: sticky;
    z-index: 99;
    top: 0;
  }
</style>
