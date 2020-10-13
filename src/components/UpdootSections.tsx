import { Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  PostsQuery,
  useVoteMutation,
} from "../generated/graphql";

interface UpdootSectionsProps {
  post: PostSnippetFragment;
}

export const UpdootSections: React.FC<UpdootSectionsProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        isLoading={loadingState === "updoot-loading"}
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({ postId: post.id, value: 1 });
          setLoadingState("not-loading");
        }}
        aria-label="updoot post"
        icon="chevron-up"
      />
      {post.points}
      <IconButton
        isLoading={loadingState === "downdoot-loading"}
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({ postId: post.id, value: -1 });
          setLoadingState("not-loading");
        }}
        aria-label="downdoot post"
        icon="chevron-down"
      />
    </Flex>
  );
};
