
    <script>
        const inputText = document.getElementById('inputText');
        const convertBtn = document.getElementById('convertBtn');
        const clearBtn = document.getElementById('clearBtn');
        const resultSection = document.getElementById('resultSection');
        const resultBox = document.getElementById('resultBox');
        const copyBtn = document.getElementById('copyBtn');

        function toSpinalCase(str) {
            return str
                .trim()
                .replace(/([a-z])([A-Z])/g, '$1-$2')  // camelCase to camel-Case
                .replace(/[\s_]+/g, '-')               // spaces and underscores to hyphens
                .replace(/[^a-z0-9-]/gi, '-')          // replace non-alphanumeric with hyphens
                .replace(/-+/g, '-')                   // multiple hyphens to single hyphen
                .replace(/^-+|-+$/g, '')               // remove leading/trailing hyphens
                .toLowerCase();
        }

        convertBtn.addEventListener('click', function() {
            const input = inputText.value;
            
            if (!input.trim()) {
                alert('Please enter some text to convert!');
                return;
            }

            const result = toSpinalCase(input);
            resultBox.textContent = result;
            resultSection.classList.remove('hidden');
        });

        clearBtn.addEventListener('click', function() {
            inputText.value = '';
            resultSection.classList.add('hidden');
            inputText.focus();
        });

        copyBtn.addEventListener('click', function() {
            const text = resultBox.textContent;
            navigator.clipboard.writeText(text).then(function() {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✓ Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(function() {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(function(err) {
                alert('Failed to copy to clipboard');
            });
        });

        // Allow Enter key to convert
        inputText.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                convertBtn.click();
            }
        });
    </script>
