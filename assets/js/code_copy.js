// get all <code> elements
var allCodeBlocksElements = $( "div.highlighter-rouge" );

allCodeBlocksElements.each(function(i) {
    // add different id for each code block

    // target   
    var currentId = "codeblock" + (i + 1);
    $("code").attr('id', currentId);
     
    // trigger
    var clipButton = '<button class="code-copy-btn" data-clipboard-target="#' + currentId + '"><i class="fas fa-clone"></i>';
    $("code").after(clipButton);
});
 
var clipboard = new ClipboardJS('.code-copy-btn');

clipboard.on('success', function(e) {
    console.log('Action:', e.action);
    console.log('Text:', e.text);
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
    console.log(e);
});
