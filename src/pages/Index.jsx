import { Container, Text, VStack, Heading, Box, Image, Link, Button, useColorMode, IconButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const { colorMode } = useColorMode();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const cancelRef = useRef();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const openDeleteDialog = (post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const deletePost = () => {
    const updatedPosts = posts.filter((post) => post !== postToDelete);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to My Personal Blog</Heading>
        <Box boxSize="sm">
          <Image src="/images/blog-banner.jpg" alt="Blog Banner" />
        </Box>
        <Text fontSize="lg" textAlign="center">
          Hi there! I'm [Your Name], and this is my personal blog where I share my thoughts, experiences, and stories. 
          Feel free to explore and connect with me through my posts.
        </Text>
        <Link href="/about" color="teal.500" fontSize="lg">Learn more about me</Link>
        <Button colorScheme="teal" as={Link} href="/add-post">Add New Post</Button>
        <VStack spacing={4} width="100%">
          {posts.map((post, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" width="100%" bg={colorMode === "light" ? "white" : "gray.700"}>
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.content}</Text>
              <IconButton
                aria-label="Delete Post"
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => openDeleteDialog(post)}
                mt={4}
              />
            </Box>
          ))}
        </VStack>
      </VStack>
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Index;