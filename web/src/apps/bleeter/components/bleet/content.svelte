<script lang="ts">
  interface Props {
    bleet: any;
  }

  let { bleet }: Props = $props();
</script>

<div>
  <p>{bleet.content}</p>
  {#if bleet.attachments && bleet.attachments.length > 0}
    <div class="mt-1">
      <img
        class="border rounded-lg"
        src={bleet.attachments[0]}
        alt="bleeter-image"
      />
    </div>
  {/if}
</div>
