Hi Diep,

Thanks for sharing the take-home assignment. I've reviewed it and wanted to share my thoughts on how I'd approach building this chatbot solution instead of actually doing the solution due to the effort required to finish it. I'm happy to take a call with you and/or with your engineering colleague to discuss further.

## High-Level Approach
Since the chatbot deals with propietary/company data, using a RAG based solution would be appropriate.

The basic flow would be:
1. Process and store pdf/web content as a vector/embeddings in a database which support vector search (Mongodb Atlast, Elastic, Quadrant).
2. When a user asks a question, find top X relevant content based on cosine search similarity. the threshold could be above 0.8
3. Use these context and user's question to feed in LLM to generate accurate answers

However I'll speak about some challenges and solutions which can differentiate the chatobt to be a production ready over toy chatbot. 

The most **important** part is to how we're processing documents. the dataset we're dealing is unstructured data(pdf/webpage). Key considerations required here is how we're doing:

1. Chunking
2. handling images/figures
3. handling tables

**Handling texts**

The pdfs given to process 1 column layout which is easy to read through any pdf parser. however it does have tables and images. In order to answer question accurately, preserving the structure of the table is necessary. One approach could be to use Azure Document Intelligence to process pdf data which can spit output in markdown format. through this we can do somewhat 'smart' chunking based on the sections/paragraphs since its good at maintaining document structure. This also has built in OCR capabilities.


For webpage scraping, i think tools like cheerio could serve the purpose of extracting content. based on html tags, we can do somewhat semantic chunking to store vectors.

**Handling Images & Figures**

This is actually a complex part. The current approach has some limitations:

Images and figures contain important information that pure text extraction misses. References to figures in text lose meaning without visual context

I'd try to address this problem this by:
1. Using Azure Document Intelligence to detect image regions
2. Storing image metadata and captions
3. Maintaining references between text and related figures
4. we may also inject some text in vector chunk if required.


### Question-Answering System
When a user asks a question:
1. Generate embedding for the question
2. Perform cosine similarity search in vector DB
3. Use similarity threshold (typically 0.7-0.8) to filter relevant chunks
4. Combine relevant chunks as context
5. Send to LLM with proper prompting
6. I'm not going details on the prompt engineering here since it's something that needs to be adjusted based on output. however few things to consider to prevent misuse the system. like giving Guardrail. having constraints by requiring citations to address hallucations etc.

---

### Frontend

Frontend is quite straight forward. there'll be one /chat api which returns SSE(server sent event) which will stream the data. It can be done in React. I have a private repo which i worked recently. Would love to discuss and demonstrate if selected for next round :)

Best regards