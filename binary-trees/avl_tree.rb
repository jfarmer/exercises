# require_relative 'binary_search_tree'
require_relative 'scanl'

# The idea behind an AVL tree is to guarantee that the
# difference in height between any node's left and right
# sub-trees is never greater than 1.
#
# Inserting or deleting might cause this to happen, so
# after either operation we check and perform a series
# of "tree rotations" to keep the tree balanced.
#
# See: https://en.wikipedia.org/wiki/Tree_rotation
#
# This is a right rotation about B:
#   B              D
#  / \            / \
# a   D    ->    B   E
#    / \        / \
#   c   E      a   c
#
# This is a left rotation about D:
#     D          B
#    / \        / \
#   B   e  ->  A   D
#  / \            / \
# A   c          c   e
#
# There are four ways a tree can be unbalanced:
# For a visualization: https://en.wikipedia.org/wiki/Tree_rotation#/media/File:Tree_Rebalancing.gif

# This doesn't NEED to inherit from BinarySearchTree, but if
# you've already implemented it this might save you some time.
#
# Add whatever other classes you find useful.
def AVLTree(value, left = EmptyTree, right = EmptyTree)
  case value
  when AVLTree
    value
  when nil
    EmptyTree
  else
    AVLTree.new(value, left, right)
  end
end

class EmptyTree
  class << self
    def insert(value)
      AVLTree(value)
    end

    def left
      EmptyTree
    end

    def right
      EmptyTree
    end

    def find(value)
      nil
    end

    def find_tree(value)
      nil
    end

    def include?(value)
      false
    end

    def remove(value)
      EmptyTree
    end

    def value
      nil
    end

    def height
      0
    end

    def size
      0
    end

    def empty?
      true
    end

    def present?
      !empty?
    end

    def sexp
      []
    end
  end
end


class AVLTree
  attr_accessor :value, :left, :right

  def initialize(value, left = EmptyTree, right = EmptyTree)
    @value = value
    @left  = left
    @right = right
  end

  def empty?
    false
  end

  def present?
    !empty?
  end

  def height
    @_height ||= 1 + [left.height, right.height].max
  end

  def size
    @_size ||= 1 + left.size + right.size
  end

  def max
    @_max ||= right.present? ? right.max : self.value
  end

  def min
    @_min ||= left.present? ? left.min : self.value
  end

  def find_tree(value)
    case value <=> self.value
    when -1
      left.find_tree(value)
    when 0
      self
    when +1
      right.find_tree(value)
    end
  end

  def find(value)
    find_tree(value) || nil
  end

  def include?(value)
    !find(value).nil?
  end

  def insert(value)
    case value <=> self.value
    when -1
      AVLTree(self.value, left.insert(value), right).rebalance
    when 0
      self
    when +1
      AVLTree(self.value, left, right.insert(value)).rebalance
    end
  end

  def remove(value, parent = nil)
    if value < self.value
      AVLTree(self.value, self.left.remove(value), self.right).rebalance
    elsif value > self.value
      AVLTree(self.value, self.left, self.right.remove(value)).rebalance
    # Cases for when value == self.value
    elsif left.present? && right.present?
      left_max = left.max
      AVLTree(left_max, self.left.remove(left_max), self.right).rebalance
    elsif left.empty?
      right
    elsif right.empty?
      left
    end
  end

  def sexp
    if left.empty? && right.empty?
      [value]
    else
      [value, left.sexp, right.sexp]
    end
  end

  def rebalance
    root = self

    case left.height - right.height
    when +2
      if left.left.height < left.right.height
        root = AVLTree(self.value, self.left.rotate_left, self.right)
      end

      root.rotate_right
    when -2
      if right.left.height > right.right.height
        root = AVLTree(self.value, self.left, self.right.rotate_right)
      end

      root.rotate_left
    else
      root
    end
  end

  def rotate_left
    root_value  = self.value
    right_value = self.right.value
    root_left   = self.left
    right_left  = self.right.left
    right_right = self.right.right

    AVLTree(
      right_value,
      AVLTree(
        root_value,
        root_left,
        right_left
      ),
      right_right
    )
  end

  def rotate_right
    root_value = self.value
    root_right = self.right
    left_value = self.left.value
    left_left  = self.left.left
    left_right = self.left.right

    AVLTree(
      left_value,
      left_left,
      AVLTree(
        root_value,
        left_right,
        root_right
      )
    )
  end
end


if __FILE__ == $PROGRAM_NAME
  require 'pp'
  require 'benchmark'

  def rand_array(size, range)
    Array.new(size) { rand(range) }
  end

  MAX_RAND = 100000000
  RAND_RANGE = -MAX_RAND..MAX_RAND

  BASE_SIZE = 2**8
  ITERATIONS = 20000


  sizes = Array.new(10) { |k| BASE_SIZE * 2**k }

  # scanl is like reduce but it returns an array containing
  # all the intermediate results
  trees = sizes.scanl(EmptyTree) do |tree, size|
    size.times.reduce(tree) { |t, _| t.insert(rand(RAND_RANGE)) }
  end.drop(1)

  puts "\nBenchmarking"

  Benchmark.bm(30) do |x|
    trees.each_with_index do |tree, k|
      x.report("finding in size #{tree.size}") do
        ITERATIONS.times do
          tree.include?(rand(RAND_RANGE))
        end
      end
    end
    trees.each_with_index do |tree, k|
      x.report("inserting in size #{tree.size}") do
        ITERATIONS.times do
          tree.insert(rand(RAND_RANGE))
        end
      end
    end
  end
end
